import { cli } from 'cli-ux'

import { BaseCommand } from '../../base'

export class DeployCommand extends BaseCommand {
  static description = `Deploy contract whose bytecode is in <bin> using private key <pk>.`

  static flags = {
    ...BaseCommand.flags,
  }

  static args = [
    {
      name: 'pk',
      required: true,
      description: 'The private key.',
    },
    {
      name: 'bin',
      required: true,
      description: 'The bin file of the contract.',
    },
  ]

  static examples = [
    'eth contract:deploy --ropsten 3daa79a26454a5528a3523f9e6345efdbd636e63f8c24a835204e6ccb5c88f9e ./contracts/proxy.bin',
  ]

  static aliases = ['ct:d', 'ct:deploy']

  async run() {
    const { args, flags } = this.parse(DeployCommand)

    let networkUrl

    try {
      networkUrl = this.getNetworkUrl(flags)

      const { bin, pk } = args
      const { deploy } = await import('../../helpers/deploy')
      const data = await deploy(networkUrl, pk, bin)

      cli.styledJSON(data)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}