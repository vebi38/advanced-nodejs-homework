import { Injectable, NotFoundException } from '@nestjs/common';
import { Room, RoomType } from './room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  private rooms: Room[] = [];
  private idCounter = 1;

  create(dto: CreateRoomDto): Room {
    const room: Room = { id: this.idCounter++, ...dto };
    this.rooms.push(room);
    return room;
  }

  findAll(): Room[] {
    return this.rooms;
  }

  findOne(id: number): Room {
    const room = this.rooms.find(room => room.id === id);
    if (!room) throw new NotFoundException('Room not found');
    return room;
  }

  update(id: number, dto: UpdateRoomDto): Room {
    const room = this.findOne(id);
    const updated = { ...room, ...dto };
    const index = this.rooms.findIndex(r => r.id === id);
    this.rooms[index] = updated;
    return updated;
  }

  remove(id: number): void {
    const index = this.rooms.findIndex(r => r.id === id);
    if (index === -1) throw new NotFoundException('Room not found');
    this.rooms.splice(index, 1);
  }
}
