import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { FileItem, FileOwner, FileType } from '../../models/file.item.model';
import { OWNERS } from '../../data/file.storage';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  fileTypes = Object.keys(FileType).filter(key => isNaN(Number(key)));
  @Output() onSave = new EventEmitter<any>();
  @Output() onHideForm = new EventEmitter<any>();
  @Input() files: FileItem[] = [];
  owners: FileOwner[] = OWNERS;
  save(form: NgForm) {
    if (form.invalid) {
      alert("Formulario invalido");
      return;
    }
    this.onSave.emit(form.value);
    this.onHideForm.emit();
  }
}
