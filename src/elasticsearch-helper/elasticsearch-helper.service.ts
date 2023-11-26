import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticSearchHelperService {
  constructor(private elasticSearchService: ElasticsearchService) {}

  indexExists(index: string) {
    return this.elasticSearchService.indices.exists({
      index: index,
    });
  }

  async createIndex(
    index: string,
    settings?: Record<string, any>,
    mappings?: Record<string, any>,
  ) {
    if (await this.indexExists(index)) {
      return;
    }

    const options = {
      index: index,
    };

    if (settings) {
      options['settings'] = settings;
    }

    if (mappings) {
      options['mappings'] = mappings;
    }

    return this.elasticSearchService.indices.create(options);
  }

  async getDocument(index: string, id: string) {
    if (!(await this.indexExists(index))) {
      throw new Error('Index does not exists');
    }

    return this.elasticSearchService.get({
      index: index,
      id: id,
    });
  }

  async insertDocument(index: string, body: Record<string, any>, id?: string) {
    if (!(await this.indexExists(index))) {
      throw new Error('Index does not exists');
    }

    const request = {
      index: index,
      body: body,
    };

    if (id) {
      request['id'] = id;
    }

    return this.elasticSearchService.index(request);
  }

  async replaceDocument(index: string, id: string, body: Record<string, any>) {
    return await this.insertDocument(index, body, id);
  }

  searchDocument(index: string, query: Record<string, any>) {
    return this.elasticSearchService.search({
      index: index,
      query: query,
    });
  }

  deleteDocument(index: string, id: string) {
    return this.elasticSearchService.delete({
      index: index,
      id: id,
    });
  }
}
