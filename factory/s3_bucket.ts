
import * as sns from "aws-cdk-lib/aws-sns";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3n from "aws-cdk-lib/aws-s3-notifications";
import * as iam from "aws-cdk-lib/aws-iam";
import { BucketEncryption, IBucket } from "aws-cdk-lib/aws-s3";
import { Topic, ITopic } from "aws-cdk-lib/aws-sns";

import { Construct } from "constructs";
import { AccountRootPrincipal, IPrincipal, PolicyStatementProps } from "aws-cdk-lib/aws-iam";

export interface GenericBucketProps {
  name: string;
  policy_statements?: {
    actions: string[]
    principlas: IPrincipal[]
  }[];
}

export interface StaticWebBucketProps extends GenericBucketProps {
  indexDocument?: string;
  errorDocument?: string;
}

export interface LoggingBucketProps extends GenericBucketProps {
  accessLoggingBucket: IBucket;
  accessLoggingPrefix?: string;
}

export interface EventStreamerBucketProps extends GenericBucketProps {
  snsTopicCreateName?: string;
  snsTopic?: ITopic
}

export class s3Bucket_Generic extends Construct {
  public readonly bucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: GenericBucketProps) {
    super(scope, id);
    this.bucket = new s3.Bucket(this, "exampleBucket", {
      bucketName: props.name,
      encryption: BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      
    });
    if (props.policy_statements) {
      for (let statement of props.policy_statements!) {
        let bucketPolicy = new iam.PolicyStatement({
          actions: statement.actions,
          resources: [this.bucket.bucketArn],
          principals: statement.principlas
        });
        this.bucket.addToResourcePolicy(bucketPolicy);
      }
    }
  }
}

export class s3Bucket_StaticWebsite extends Construct {
  public readonly bucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: StaticWebBucketProps) {
    super(scope, id);
    let indexDocument: string;
    let errorDocument: string;
    if (props.indexDocument) {
      indexDocument = props.indexDocument
    } else {
      indexDocument = "index.html" // default 
    }
    if (props.errorDocument) {
      errorDocument = props.errorDocument
    } else {
      errorDocument = "error.html" // default 
    }
    this.bucket = new s3.Bucket(this, "exampleBucket", {
      bucketName: props.name,
      encryption: BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      websiteIndexDocument: indexDocument,
      websiteErrorDocument: errorDocument
    });
    if (props.policy_statements) {
      for (let statement of props.policy_statements!) {
        let bucketPolicy = new iam.PolicyStatement({
          actions: statement.actions,
          resources: [this.bucket.bucketArn],
          principals: statement.principlas
        });
        this.bucket.addToResourcePolicy(bucketPolicy);
      }
    }
  }
}

export class s3Bucket_LoggingBucket extends Construct {
  public readonly bucket: s3.Bucket;
  constructor(scope: Construct, id: string, props: LoggingBucketProps) {
    super(scope, id);
    this.bucket = new s3.Bucket(this, "exampleBucket", {
      bucketName: props.name,
      encryption: BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      serverAccessLogsBucket: props.accessLoggingBucket,
      serverAccessLogsPrefix: props.accessLoggingPrefix
    });
    if (props.policy_statements) {
      for (let statement of props.policy_statements!) {
        let bucketPolicy = new iam.PolicyStatement({
          actions: statement.actions,
          resources: [this.bucket.bucketArn],
          principals: statement.principlas
        });
        this.bucket.addToResourcePolicy(bucketPolicy);
      }
    }
  }
}

export class s3Bucket_EventStreamer extends Construct {
  public readonly bucket: s3.Bucket;
  public readonly topic: sns.Topic;

  constructor(scope: Construct, id: string, props: EventStreamerBucketProps) {
    super(scope, id);
    if (props.snsTopicCreateName) {
      this.bucket = new s3.Bucket(this, "exampleBucket", {
        bucketName: props.name,
        encryption: BucketEncryption.S3_MANAGED,
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        
      });
      if (props.policy_statements) {
        for (let statement of props.policy_statements!) {
          let bucketPolicy = new iam.PolicyStatement({
            actions: statement.actions,
            resources: [this.bucket.bucketArn],
            principals: statement.principlas
          });
          this.bucket.addToResourcePolicy(bucketPolicy);
        }
      }
      this.topic = new sns.Topic(this, 'exampleSNS', {
        topicName: props.snsTopicCreateName
      });
      this.bucket.addEventNotification(s3.EventType.OBJECT_CREATED_PUT, new s3n.SnsDestination(this.topic));
    } else if (props.snsTopic) {
      this.bucket = new s3.Bucket(this, "exampleBucket", {
        bucketName: props.name,
        encryption: BucketEncryption.S3_MANAGED,
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        
      });
      if (props.policy_statements) {
        for (let statement of props.policy_statements!) {
          let bucketPolicy = new iam.PolicyStatement({
            actions: statement.actions,
            resources: [this.bucket.bucketArn],
            principals: statement.principlas
          });
          this.bucket.addToResourcePolicy(bucketPolicy);
        }
      };
      this.bucket.addEventNotification(s3.EventType.OBJECT_CREATED_PUT, new s3n.SnsDestination(props.snsTopic));
    }
  }
}