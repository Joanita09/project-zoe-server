import { Injectable } from '@nestjs/common';
import { CreateHelpDto } from './dto/create-help.dto';
import { UpdateHelpDto } from './dto/update-help.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Help from './entities/help.entity';
import HelpDto from './dto/help.dto';
import SearchDto from '../shared/dto/search.dto';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';



@Injectable()
export class HelpService {
  constructor(
    @InjectRepository(Help)
    private readonly repository: Repository<Help>,
  ) {}

  async create(data: CreateHelpDto): Promise<HelpDto> {
    return this.repository.save(data);
  }

  async findAll(req: SearchDto): Promise<HelpDto[]> {
    const data = await this.repository.find({
      select: ['title', 'category', 'url']
    })
    return data;
  }

  findOne(id: number){
    return `This action returns a #${id} help`;
  }

  async update(data: UpdateHelpDto) {
    const file = this.findOne(data.id);

    const resp = await this.repository
      .createQueryBuilder()
      .update()
      .where('id = :id', { id: data.id })
      .execute();

    return this.findOne(data.id);
  }

  remove(id: number) {
    return `This action removes a #${id} help`;
  }
}
