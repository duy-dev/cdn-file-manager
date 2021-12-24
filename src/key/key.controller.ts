import { Controller, Logger, Post, Body } from '@nestjs/common';
import { TasksService } from 'src/tasks/tasks.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { KeyService } from './key.service';
import { Link } from './link.entity';

@Controller('key')
export class KeyController {
  private logger = new Logger('TasksController');
  constructor(private keyService: KeyService) {}

  @Post('create-link')
  createLink(@Body() createLinkDto: CreateLinkDto): Promise<Link> {
    this.logger.verbose(
      `creating a new link. Data ${JSON.stringify(createLinkDto)}`,
    );
    return this.keyService.createTask(createLinkDto);
  }
}
