import * as pulumi from '@pulumi/pulumi'
import * as aws from '@pulumi/aws'

const account = new aws.organizations.Account(
	'account',
	{
		email: 'test@test.com',
		closeOnDeletion: true,
	}
);

const provider = new aws.Provider(
	'provider',
	{
		region: 'us-east-1',
		assumeRole: {
			roleArn: pulumi.interpolate`arn:aws:iam::${account.id}:role/OrganizationAccountAccessRole`,
		},
	}
);

// This will not be created because `pulumi preview` panics when trying to create the provider
new aws.s3.Bucket('bucket', {}, { provider })