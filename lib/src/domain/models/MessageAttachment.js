"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentDescriptor = void 0;
class AttachmentDescriptor {
    id;
    mediaType;
    data;
    filename;
    format;
    lastModTime;
    byteCount;
    deascription;
    constructor(id, mediaType = null, data, filename, format = null, lastModTime = null, byteCount = null, deascription = null) {
        this.id = id;
        this.mediaType = mediaType;
        this.data = data;
        this.filename = filename;
        this.format = format;
        this.lastModTime = lastModTime;
        this.byteCount = byteCount;
        this.deascription = deascription;
    }
}
exports.AttachmentDescriptor = AttachmentDescriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZUF0dGFjaG1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZG9tYWluL21vZGVscy9NZXNzYWdlQXR0YWNobWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFnQ0EsTUFBYSxvQkFBb0I7SUFFYjtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBUmxCLFlBQ2tCLEVBQVUsRUFDVixZQUEyQixJQUFJLEVBQy9CLElBQW9CLEVBQ3BCLFFBQThCLEVBQzlCLFNBQXdCLElBQUksRUFDNUIsY0FBNkIsSUFBSSxFQUNqQyxZQUEyQixJQUFJLEVBQy9CLGVBQThCLElBQUk7UUFQbEMsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUNWLGNBQVMsR0FBVCxTQUFTLENBQXNCO1FBQy9CLFNBQUksR0FBSixJQUFJLENBQWdCO1FBQ3BCLGFBQVEsR0FBUixRQUFRLENBQXNCO1FBQzlCLFdBQU0sR0FBTixNQUFNLENBQXNCO1FBQzVCLGdCQUFXLEdBQVgsV0FBVyxDQUFzQjtRQUNqQyxjQUFTLEdBQVQsU0FBUyxDQUFzQjtRQUMvQixpQkFBWSxHQUFaLFlBQVksQ0FBc0I7SUFDakQsQ0FBQztDQUNMO0FBWEQsb0RBV0MifQ==