import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FileItem, FileType } from '../../models/file.item.model';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-repository',
  standalone: true,
  imports: [DatePipe, NgClass],
  templateUrl: './repository.component.html',
  styleUrl: './repository.component.css'
})
export class RepositoryComponent {
  @Input() files: FileItem[] = [];
  @Output() filesSelected = new EventEmitter<string[]>();

  selectedFiles: string[] = [];

  getFilteredFiles = () => {
    const folders = this.files.filter(file => file.type === FileType.FOLDER).sort((a, b) => a.name.localeCompare(b.name));
    const files = this.files.filter(file => file.type === FileType.FILE).sort((a, b) => a.name.localeCompare(b.name));
    return [...folders, ...files];
  }

  toggleFileSelection(fileId: string) {
    const index = this.selectedFiles.indexOf(fileId);
    if (index > -1) {
      this.selectedFiles.splice(index, 1);
    } else {
      this.selectedFiles.push(fileId);
    }
    this.filesSelected.emit(this.selectedFiles);
  }

  isFileSelected(fileId: string): boolean {
    return this.selectedFiles.includes(fileId);
  }

  truncateFileName(name: string): string {
    return name.length > 10 ? name.slice(0, 10) + '...' : name;
  }

  getExtraOwnersCount(file: FileItem): number {
    return file.owners.length > 3 ? file.owners.length - 3 : 0;
  }
}