# Sam Druant's Server

## Data Models

There are three main data models:

- User - the website admin.
- Work - an artisitic product.
- Project - a collection of works for a show or event. It is worth mentioning here that a work can exist in multiple projects (e.g. a work can be shown in multiple shows).

## Getting started

> see [this guide](https://www.oliverrr.net/notes/test-aws-locally-with-localstack) on how to setup the local s3 service

To mimic AWS's S3 service, we use the localstack docker image.

Pre-requisites:

- Docker
- Python 3.8
- LocalStack
- AWS CLI

To start the localstack service, run the following command:

```bash
# create a bucket
awslocal s3api create-bucket --bucket samdruant-photos
```
