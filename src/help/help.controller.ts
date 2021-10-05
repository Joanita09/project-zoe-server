import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards,UseInterceptors,} from '@nestjs/common';
import { HelpService } from './help.service';
import { CreateHelpDto } from './dto/create-help.dto';
import { UpdateHelpDto } from './dto/update-help.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SentryInterceptor } from '../../src/utils/sentry.interceptor';

@UseInterceptors(SentryInterceptor)
@UseGuards(JwtAuthGuard)
@ApiTags('Help')
@Controller('help')
export class HelpController {
  constructor(private readonly helpService: HelpService) {}

  @Post()
  create(@Body() createHelpDto: CreateHelpDto) {
    return this.helpService.create(createHelpDto);
  }

  @Get()
  findAll() {
    return this.helpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.helpService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateHelpDto: UpdateHelpDto) {
    return this.helpService.update(+id, updateHelpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.helpService.remove(+id);
  }
}
