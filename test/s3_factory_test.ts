import * as cdk from "aws-cdk-lib";
import { s3FactoryStack } from "../lib/factory_test_stack";
import { AccountRootPrincipal, IPrincipal, PolicyStatementProps } from "aws-cdk-lib/aws-iam";

const app = new cdk.App();
new s3FactoryStack(app, "s3FactoryStack")