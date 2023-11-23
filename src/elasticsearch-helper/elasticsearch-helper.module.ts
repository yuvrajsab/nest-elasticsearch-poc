import { Module } from '@nestjs/common';
import { ElasticSearchHelperService } from './elasticsearch-helper.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: process.env.ELASTIC_URL,
    }),
  ],
  controllers: [],
  providers: [ElasticSearchHelperService],
  exports: [ElasticSearchHelperService],
})
export class ElasticSearchHelperModule {}
