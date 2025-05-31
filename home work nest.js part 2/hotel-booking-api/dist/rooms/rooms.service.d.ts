import { Room } from './room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
export declare class RoomsService {
    private rooms;
    private idCounter;
    create(dto: CreateRoomDto): Room;
    findAll(): Room[];
    findOne(id: number): Room;
    update(id: number, dto: UpdateRoomDto): Room;
    remove(id: number): void;
}
