import { Module } from '@nestjs/common'

import PcTemplateModule from './module/module'

@Module({
	imports: [PcTemplateModule]
})

export default class IndexModule {}
