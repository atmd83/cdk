import { Duration, Stack, StackProps } from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as iam from "aws-cdk-lib/aws-iam";
import { BucketEncryption } from "aws-cdk-lib/aws-s3";
import { s3Bucket_Generic, s3Bucket_StaticWebsite, s3Bucket_LoggingBucket, s3Bucket_EventStreamer } from "../factory/s3_bucket"
import { Construct } from "constructs";
import { AccountRootPrincipal, IPrincipal, PolicyStatementProps } from "aws-cdk-lib/aws-iam";


export class s3FactoryStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    props?: StackProps
  ) {
    super(scope, id, props);
    const AccessLogBucket = new s3Bucket_Generic(this, "GenericBucket1", {
      name: "mygenericbucketfromfactoryoaghowiuhgajweogdshgoidsu",
    })
    new s3Bucket_StaticWebsite(this, "StaticBucket1", {
      name: "mystaticwebbucketfromfactoryaadklvndaskljngasdlkj",
      indexDocument: "index.html"
    })
    new s3Bucket_LoggingBucket(this, "LoggingBucket1", {
      name: "loggingbucket1createdfromfactoryngdlasghnlksdahgklganrdlkg",
      accessLoggingBucket: AccessLogBucket.bucket
    })
    new s3Bucket_EventStreamer(this, "EventStreamerBucket1", {
      name: "eventsteamerbucketfromfactoryahdkfahldkfhdnvlkasnvldksn",
      snsTopicCreateName: "S3EventStreamerTopic"
    })
    new s3Bucket_Generic(this, "GenericBucket2", {
      name: "mygenericbucketfromfactorywithdefinedaccesspolicykldsahflkdshfaglkhd",
      policy_statements: [
        {
          actions: ['s3:Get*'],
          principlas: [new AccountRootPrincipal],
        },
        {
          actions: ['s3:List*'],
          principlas: [new AccountRootPrincipal],
        }
      ]
    })
  }
}










