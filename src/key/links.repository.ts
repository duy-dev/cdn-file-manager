import { Repository, EntityRepository } from 'typeorm';
import { Link } from './link.entity';
import { CreateLinkDto } from './dto/create-link.dto';

@EntityRepository(Link)
export class LinkRepository extends Repository<Link> {
  async createLink(
    createLinkDto: CreateLinkDto,
    hashData: string,
    shortenedUrl: string,
  ): Promise<Link> {
    const { IP, MAC } = createLinkDto;
    const link = this.create({
      IP,
      MAC,
      link_url: shortenedUrl,
      created_at: new Date(),
    });

    //await this.save(link);
    console.log(link);

    return link;
  }
}
