import { Injectable, Logger } from '@nestjs/common';
import { CreateHelpDto } from './dto/create-help.dto';
import { UpdateHelpDto } from './dto/update-help.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import Help from './entities/help.entity';
import HelpDto from './dto/help.dto';

@Injectable()
export class HelpService {
  constructor(
    @InjectRepository(Help)
    private readonly repository: Repository<Help>,
  ) {}

  toDetailView(file: Help): HelpDto {
    const { title, category, ...rest } = file;
    return {
      ...rest,
    } as any;
  }

  async create(createHelpDto: CreateHelpDto): Promise<HelpDto> {
    Logger.log(`Create.File starting ${createHelpDto.title}`);

    const result = await this.repository
      .createQueryBuilder()
      .insert()
      .values({
        id: 0,
        ...createHelpDto,
      })
      .execute();
      const insertedId = result.identifiers[0]['id'];
    Logger.log(`Create.Help success name: ${createHelpDto.title} id:${insertedId}`);

    return this.findOne(insertedId, true);

  }

  findAll() {
    return `This action returns all help`;
  }

  async findOne(id: number, full = true): Promise<HelpDto> {
    const data = await this.repository.findOne(id)
    return this.toDetailView(data);
  }

  update(id: number, updateHelpDto: UpdateHelpDto) {
    return `This action updates a #${id} help`;
  }

  remove(id: number) {
    return `This action removes a #${id} help`;
  }
}
