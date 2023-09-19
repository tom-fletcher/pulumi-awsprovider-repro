# pulumi-awsprovider-repro

## Steps to reproduce

1. Clone this repo
2. Configure some AWS credentials in your environment. For simplicity of repro,
   this might just be a copy and paste into the shell
3. Run `pulumi login`
3. Run `pulumi up`, create a temporary stack. There is no need to deploy any
   resources, as the error occurs during preview.

The pulumi cli will panic with the following error:

```
  pulumi:pulumi:Stack (awsprovider-repro-repro):
    panic: runtime error: invalid memory address or nil pointer dereference
    [signal SIGSEGV: segmentation violation code=0x1 addr=0x28 pc=0x130e43b]
    goroutine 53 [running]:
    github.com/hashicorp/terraform-provider-aws/internal/framework/types.durationType.Validate(0x0?, {0x1a1a3240?, 0x0?}, {{0x0, 0x0}, {0x0, 0x0}}, {{0xc00ae873c0, 0x3, 0x4}})
        /home/runner/work/pulumi-aws/pulumi-aws/upstream/internal/framework/types/duration.go:106 +0x7b
    github.com/hashicorp/terraform-plugin-framework/internal/fwschemadata.Data.ValueAtPath({{0xe1937c2, 0xd}, {0xf6f9eb8, 0xc001b63e80}, {{0xf6ec4b8, 0xc0034dfbf0}, {0xc671640, 0xc0034deb70}}}, {0xf6dc250, 0xc0036342a0}, ...)
        /home/runner/go/pkg/mod/github.com/hashicorp/terraform-plugin-framework@v1.4.0/internal/fwschemadata/data_value.go:82 +0x675
    github.com/hashicorp/terraform-plugin-framework/internal/fwserver.AttributeValidate({0xf6dc250, 0xc003467c80}, {0xf6f2d00, 0xc001b799e0}, {{{0xc00ae873c0, 0x3, 0x4}}, {0x1, {0xc00ae87400, 0x3, ...}}, ...}, ...)
        /home/runner/go/pkg/mod/github.com/hashicorp/terraform-plugin-framework@v1.4.0/internal/fwserver/attribute_validation.go:74 +0x275
    github.com/hashicorp/terraform-plugin-framework/internal/fwserver.NestedBlockObjectValidate({0xf6dc250, 0xc003467c80}, {0xf6e4d40, 0xc00ae86c80}, {{{0xc00adb1c20, 0x2, 0x2}}, {0x1, {0xc00adb1c40, 0x2, ...}}, ...}, ...)
        /home/runner/go/pkg/mod/github.com/hashicorp/terraform-plugin-framework@v1.4.0/internal/fwserver/block_validation.go:439 +0x985
    github.com/hashicorp/terraform-plugin-framework/internal/fwserver.BlockValidate({0xf6dc250, 0xc003467c80}, {0xf6eccc8, 0xc001bc07e0}, {{{0xc00ae81ac0, 0x1, 0x1}}, {0x1, {0xc00ae81ae0, 0x1, ...}}, ...}, ...)
        /home/runner/go/pkg/mod/github.com/hashicorp/terraform-plugin-framework@v1.4.0/internal/fwserver/block_validation.go:83 +0xf45
    github.com/hashicorp/terraform-plugin-framework/internal/fwserver.SchemaValidate({0xf6dc250, 0xc003467c80}, {0xf6f9eb8, 0xc001b63e80}, {{{{0xf6ec4b8, 0xc0034dfbf0}, {0xc671640, 0xc0034deb70}}, {0xf6f9eb8, 0xc001b63e80}}}, ...)
        /home/runner/go/pkg/mod/github.com/hashicorp/terraform-plugin-framework@v1.4.0/internal/fwserver/schema_validation.go:66 +0x485
    github.com/hashicorp/terraform-plugin-framework/internal/fwserver.(*Server).ValidateProviderConfig(0xc0008fcf20, {0xf6dc250, 0xc003467c80}, 0xc0020085c0, 0xc001bcfa10)
        /home/runner/go/pkg/mod/github.com/hashicorp/terraform-plugin-framework@v1.4.0/internal/fwserver/server_validateproviderconfig.go:87 +0x390
    github.com/hashicorp/terraform-plugin-framework/internal/proto6server.(*Server).ValidateProviderConfig(0xc0008fcf20, {0xf6dc250?, 0xc003404750?}, 0x0?)
        /home/runner/go/pkg/mod/github.com/hashicorp/terraform-plugin-framework@v1.4.0/internal/proto6server/server_validateproviderconfig.go:39 +0x1dc
    github.com/pulumi/pulumi-terraform-bridge/pf/tfbridge.(*provider).validateProviderConfig(0xc0009e4100, {0xf6dc250, 0xc003404750}, {0xc00aaa4c80, 0x43}, 0x0?)
        /home/runner/go/pkg/mod/github.com/pulumi/pulumi-terraform-bridge/pf@v0.16.1/tfbridge/provider_checkconfig.go:111 +0x197
    github.com/pulumi/pulumi-terraform-bridge/pf/tfbridge.(*provider).CheckConfigWithContext(0xc0009e4100, {0xf6dc250?, 0xc0034042a0?}, {0xc00aaa4c80, 0x43}, 0xc9fc2e0?, 0xc003404540, 0x0?)
        /home/runner/go/pkg/mod/github.com/pulumi/pulumi-terraform-bridge/pf@v0.16.1/tfbridge/provider_checkconfig.go:86 +0x413
    github.com/pulumi/pulumi-terraform-bridge/pf/internal/plugin.(*providerServer).CheckConfig(0xc0033ca600, {0xf6dc250, 0xc0034042a0}, 0xc00abe53e0)
        /home/runner/go/pkg/mod/github.com/pulumi/pulumi-terraform-bridge/pf@v0.16.1/internal/plugin/provider_server.go:198 +0x1ad
    github.com/pulumi/pulumi-terraform-bridge/x/muxer.(*muxer).CheckConfig.func1()
        /home/runner/go/pkg/mod/github.com/pulumi/pulumi-terraform-bridge/x/muxer@v0.0.7-0.20230801203955-5d215c892096/muxer.go:115 +0x6f
    github.com/pulumi/pulumi-terraform-bridge/x/muxer.asyncJoin[...].func1()
        /home/runner/go/pkg/mod/github.com/pulumi/pulumi-terraform-bridge/x/muxer@v0.0.7-0.20230801203955-5d215c892096/muxer.go:562 +0x42
    created by github.com/pulumi/pulumi-terraform-bridge/x/muxer.asyncJoin[...] in goroutine 51
        /home/runner/go/pkg/mod/github.com/pulumi/pulumi-terraform-bridge/x/muxer@v0.0.7-0.20230801203955-5d215c892096/muxer.go:561 +0x6c

  pulumi:providers:aws (provider):
    error: rpc error: code = Unavailable desc = error reading from server: EOF
```

## Notes

This only happens if the account has not yet been created. If the account
exists, the Provider will be created. 