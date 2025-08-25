import { Module } from '@nestjs/common'
import Controller from './controller'

@Module({
  controllers: [Controller]
})
export default class PcPageTemplateModule {}
