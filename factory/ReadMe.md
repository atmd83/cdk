### S3 Factory Constucts 
In the s3 file contained inside this Dir there are 4 custom cdk constructs that contain hyphothetical use cases for S3 Buckets. They are as follows:
- Generic Bucket (Block all public access, S3 encyrption etc...)
- Static Website Bucket (contains a index.hml and error.html static website configuration, note that you will need to turn block public access off for it to be used)
- Logging Bucket (Contains access logging configuration to another S3 bucket) 
- Event Streaming Bucket (this will stream notifications to a designated SNS topic or create a topic for you)

You can reference the IBucket type from any of the created constructs using the .bucket class attribute. And .topic for the SNS topic that will potentially be created with the event streamer bucket. 

Each construct will need to take in "this" and "id" for the cfn template as well as the propeties which are defined and extended through the GenericBucketProperties Interface. 

You can see an example of how to create a stack with each of these constructs in the lib folder and show how to create an app from this in the test folder. 

### Preface 
This Code was written with limited CDK and TypeScript knowledge, there are many improvements that should be made but this serves as a good hypothetical construct library for now. 
