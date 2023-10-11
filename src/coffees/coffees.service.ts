import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  findAll = () => {
    return this.coffeeRepository.find({
      relations: {
        flavors: true,
      },
    });
  };

  findOne = async (id: number) => {
    const coffee = await this.coffeeRepository.findOne({
      relations: { flavors: true },
      where: { id: id },
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  };

  create = (createCoffeeDto: CreateCoffeeDto) => {
    const coffee = this.coffeeRepository.create(createCoffeeDto);
    this.coffeeRepository.save(coffee);
  };

  update = async (id: number, updateCoffeeDto: UpdateCoffeeDto) => {
    const coffee = await this.coffeeRepository.preload({
      id: id,
      ...updateCoffeeDto,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee $#{id} not found.`);
    }
    return this.coffeeRepository.save(coffee);
  };

  remove = async (id: number) => {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  };
}
