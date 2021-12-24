import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom, map } from 'rxjs';
import { RsaService } from 'src/shared/services/rsa.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { Link } from './link.entity';
import { LinkRepository } from './links.repository';

@Injectable()
export class KeyService {
  constructor(
    @InjectRepository(LinkRepository)
    private linkRepository: LinkRepository,
    private rsaService: RsaService,
    private httpService: HttpService,
  ) {}

  async createTask(createLinkDto: CreateLinkDto): Promise<Link> {
    let hashData: string = this.rsaService.encodeRSA(createLinkDto);
    console.log(hashData);
    let dataDecode = this.rsaService.decodeRSA(hashData);
    console.log(dataDecode);
    const linkId = this.rsaService.encodeID(Date.now());
    console.log('linkId', linkId);
    const linkDestination = `https://auto.play-together.shop/key/${hashData}`;

    const url = `https://link1s.com/api?api=9e1b7e5199d2d939cc7e36fd64b65a472ddb4e6f&url=${linkDestination}&alias=auto_${linkId}`;
    const resp = await firstValueFrom(this.httpService.get(url));
    if (resp.data.status === 'success' && resp.data.shortenedUrl) {
      return this.linkRepository.createLink(
        createLinkDto,
        hashData,
        resp.data.shortenedUrl,
      );
    } else {
      throw new InternalServerErrorException();
    }
  }
}
