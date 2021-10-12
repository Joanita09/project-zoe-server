import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards,UseInterceptors, Query,} from '@nestjs/common';
import { HelpService } from './help.service';
import { CreateHelpDto } from './dto/create-help.dto';
import { UpdateHelpDto } from './dto/update-help.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SentryInterceptor } from '../utils/sentry.interceptor';
import SearchDto from '../shared/dto/search.dto';
import HelpDto from './dto/help.dto';

@UseInterceptors(SentryInterceptor)
@UseGuards(JwtAuthGuard)
@ApiTags('Help')
@Controller('api/help')
export class HelpController {
  constructor(private readonly helpService: HelpService) {}

  @Get()
  async findAll(@Query() req: SearchDto): Promise<HelpDto[]> {
    return this.helpService.findAll(req);
  }

  @Post()
  create(@Body() createHelpDto: CreateHelpDto) {
    return this.helpService.create(createHelpDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.helpService.findOne(+id);
  }

  @Put()
  update(@Body() updateHelpDto: UpdateHelpDto) {
    return this.helpService.update(updateHelpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.helpService.remove(+id);
  }
}
