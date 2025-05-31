"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
let RoomsService = class RoomsService {
    rooms = [];
    idCounter = 1;
    create(dto) {
        const room = { id: this.idCounter++, ...dto };
        this.rooms.push(room);
        return room;
    }
    findAll() {
        return this.rooms;
    }
    findOne(id) {
        const room = this.rooms.find(room => room.id === id);
        if (!room)
            throw new common_1.NotFoundException('Room not found');
        return room;
    }
    update(id, dto) {
        const room = this.findOne(id);
        const updated = { ...room, ...dto };
        const index = this.rooms.findIndex(r => r.id === id);
        this.rooms[index] = updated;
        return updated;
    }
    remove(id) {
        const index = this.rooms.findIndex(r => r.id === id);
        if (index === -1)
            throw new common_1.NotFoundException('Room not found');
        this.rooms.splice(index, 1);
    }
};
exports.RoomsService = RoomsService;
exports.RoomsService = RoomsService = __decorate([
    (0, common_1.Injectable)()
], RoomsService);
//# sourceMappingURL=rooms.service.js.map