# aero2speed - A step-by-step guide to deploying a SPA to Akash Network

Here we will be deploying a simple single page web app (http://tuock5c14lbs9bhrg35rrpshdg.ingress.sjc1p0.mainnet.akashian.io/#/) on Akash network. This project is built using VueJs but the basic steps will remain same regardless of your SPA choice - Angular, React or even static HTMl site.

## Prerequisites

* A general understanding of [Docker containerization](https://www.docker.com/)
* [Docker client](https://docs.docker.com/get-docker/) install
* [Akash CLI](https://github.com/ovrclk/docs/blob/master/cli/akash.md)
* Other useful Akash references:
  * [How to guide](https://docs.akash.network/)
  * [SDL](https://github.com/ovrclk/docs/blob/master/documentation/sdl.md)

## Assumptions
1) You are a dev with some experience in Node and Package manager, and docker.
2) You are working on Mac as some of the commands used here apply to Mac only (but maybe similar in other OS's, not sure...)

### Step 1 - Setting up docker

If you already have your website dockerized, then you can skip this step. If not then read-on.

Akash Network runs on a kubernetes cluster so in order to run your project on Akash, you need to containerize it first and then push the docker image to Akash.

In order to package the app as a container, create a Dockerfile like:

```
# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
The above example does 2 things - 1) Compiles a distribution build and 2) Pulls nginx image and exposes the port. You may need to adjust the build step depending on your environment. After you have the file, test it locally first by running:

```
docker build -t aero2speed/webapp .
docker run -it -p 8080:80 --rm --name aero2speed aero2speed/webapp
```

If all good, you should be able to run the app on your localhost:8080.

### Step 2 - Pushing Docker image to dockerhub

This is continuation to step 1. Here we will push the docker image to [dockerhub repo](https://hub.docker.com/). If you dont have an dockerhub account, sign up for one and setup a new public repo.

Next, we need to tag the image and push it to the newly created repository on dockerhub. 

```
docker tag aero2speed/webapp:latest sanmeets/aero2speed:release-v1.0
docker push sanmeets/aero2speed:release-v1.0
```

### Step 3 - Setting up Akash

Now that we have our dockerfile setup and image pushed to dockerhub, setup Akash. You know, the fun stuff...

Akash has done good job detailing steps to install here (https://docs.akash.network/guides/guides), something like...

```
brew install akash
akash version
```

Akash devs are building at a hyper-speed so make sure you akash version is up to date. Check their github page to see latest version.

Next, configure and expose necessaray environment variables as detailed in Akash guide. High level variables:

```
AKASH_NET="https://raw.githubusercontent.com/ovrclk/net/master/mainnet"

AKASH_VERSION="$(curl -s "$AKASH_NET/version.txt")"

AKASH_CHAIN_ID="$(curl -s "$AKASH_NET/chain-id.txt")"

AKASH_NODE="$(curl -s "$AKASH_NET/rpc-nodes.txt" | shuf -n 1)"

```

### Step 4 - Setup up Wallet

From Akash's [developer guide](https://docs.akash.network/guides/wallet)

```
KEY_NAME=your_name_of_choice-ANY
KEYRING_BACKEND=os
```
You have option to setup new wallet (which is what I chose) or recover your existing wallet.

If setting up new wallet, run:
```
akash \
  --keyring-backend "$KEYRING_BACKEND" \
  keys add "$KEY_NAME"
 ```
 
To link an existing wallet instead, run:

 ```
 akash \
  --keyring-backend "$KEYRING_BACKEND" \
   keys add "$KEY_NAME" \
  --recover
 ```

Make sure to fund your Wallet with minimum of 5 AKT (for escrow) plus some change(UAKT) that you will need for lease bidding. 

Next, get your wallet address and set it to a variable.

```
akash \
  --keyring-backend "$KEYRING_BACKEND" \
  keys show "$KEY_NAME" -a

ACCOUNT_ADDRESS={accound_address_from_above_command}
```

Check your wallet balance:
```
akash \
  --node "$AKASH_NODE" \
  query bank balances "$ACCOUNT_ADDRESS"
 ```

### Step 5 - Create deploy.yml file

Add deploy.yml to your project. You can just copy the deploy.yml template from Akash guide (https://docs.akash.network/guides/deploy)

Just make sure, you update the image reference to your dockerhub image name and the port # that you are exposing in your Dockerfile.

### Step 6 - Create deployment in Akash

Finally, to deploy in akash. 

1) Create certificate
```
akash tx cert create client --chain-id $AKASH_CHAIN_ID --keyring-backend $KEYRING_BACKEND --from $KEY_NAME --node $AKASH_NODE --fees 5000uakt
```
2) Deploy to akash
```
akash deploy create deploy.yml --from $KEY_NAME --chain-id $AKASH_CHAIN_ID --keyring-backend $KEYRING_BACKEND --node $AKASH_NODE --fees 5000uakt
```

That's it, you should see a return output with uri. And you are ready to roll!

### Step 7 - Updating Image Code

This is something I could not find easily but the guys at discord were super helpful. As would happen, there will be changes to image and code will need an update. To do so:

1) Build new docker image, tag it to new version and push it to dockerhub. Then update deploy.yml to reference the updated dockerhub version.

2) Query existing lease
``` 
akash query market lease list --owner $ACCOUNT_ADDRESS --node $AKASH_NODE --state active
```
3) Your output will return provider and dseq. Set the $PROVIDER and $DSEQ values. Then run update command:

```
akash tx deployment update deploy.yml --from $KEY_NAME --node $AKASH_NODE --chain-id $AKASH_CHAIN_ID --keyring-backend $KEYRING_BACKEND --dseq $DSEQ
```

And one final step, send manifest to provider:
```
akash provider send-manifest deploy.yml --keyring-backend=os --node $AKASH_NODE --from=$KEY_NAME --provider=$PROVIDER --dseq $DSEQ --home ~/.akash
```

It takes about a minute(or less) before provider swaps to the new manifest.

That's about it, i think. Guys at discord are super nice, visit them if you have questions. (https://discord.com/channels/747885925232672829/771909909335506955)

### Next steps:

1) Add hostname so you can forward your custom domain to the uri.
2) SSL site - I plan to install letsencrypt-certbot on the docker image

### Closing remarks

If you already have your project setup with docker, the work is minimal to move it to Akash. Otherwise there is bit of setting up with docker but if you are familiar with docker, then its fairly straightfoward.

