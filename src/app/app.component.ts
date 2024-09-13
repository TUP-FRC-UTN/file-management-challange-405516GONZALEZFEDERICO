import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileItem, FileOwner, FileType } from '../models/file.item.model';
import { FILE_LIST } from '../data/file.storage';
import { RepositoryComponent } from './repository/repository.component';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RepositoryComponent, FormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
  title = 'file-management';
  files: FileItem[] = FILE_LIST;
  estadoComponente: boolean = false;
  selectedFiles: string[] = [];

  onHideList() {
    this.estadoComponente = true;
  }

  onHideForm() {
    this.estadoComponente = false;
  }

  receptFormValue = (form: any) => {
    console.log(this.files)
    console.log(form);

    const newFileOwner: FileOwner = {
      name: 'Default Owner',
      avatarUrl: form.owners
    };

    const existingFolderIndex = this.files.findIndex(file => file.id === form.folder);

    if (existingFolderIndex !== -1) {
      const existingFolder = this.files[existingFolderIndex];
      existingFolder.owners.push(newFileOwner);

      const newFile: FileItem = {
        id: form.fileId,
        name: form.name,
        creation: new Date(form.date),
        owners: [newFileOwner],
        type: form.fileType === "FOLDER" ? FileType.FOLDER : FileType.FILE,
        parentId: form.folder
      };
    } else {
      const newFileOrFolder: FileItem = {
        id: form.fileId,
        name: form.name,
        creation: new Date(form.date),
        owners: [newFileOwner],
        type: form.fileType === "FOLDER" ? FileType.FOLDER : FileType.FILE,
        parentId: undefined
      };
      this.files.push(newFileOrFolder);
    }
    console.log(this.files);
    this.onHideForm();
  }


  onFilesSelected(selectedFileIds: string[]) {
    this.selectedFiles = selectedFileIds;
  }

  deleteSelectedFiles() {
    if (this.selectedFiles.length === 0) {
      return;
    }
    
    if (this.selectedFiles.length === 1 || confirm(`¿Está seguro de que desea borrar ${this.selectedFiles.length} archivos/carpetas?`)) {
      this.files = this.files.filter(file => !this.selectedFiles.includes(file.id));
      this.selectedFiles = [];
    }
  }
}
