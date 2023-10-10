import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return `This action returns all the coffees. Limit: ${limit}, offset: ${offset} `;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns #${id}`;
  }

  @Post()
  create(@Body() body) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This action updates #${id} coffee.`;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return `This action removes #${id} coffee.`;
  }
}
