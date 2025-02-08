import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type MODAL_VIEWS =
  | 'DELETE_PRODUCT'
  | 'DELETE_ADDRESS'
  | 'DELETE_CATEGORY'
  | 'ADD_OR_UPDATE_ADDRESS'
  | 'SEARCH_VIEW'
  | 'DELETE_FLASH_SALE'
  | 'DESCRIPTION_VIEW'
  | 'COUPON_APPROVE_VIEW'
  | 'VENDOR_FS_REQUEST_APPROVE_VIEW'
  | 'VENDOR_FS_REQUEST_DISAPPROVE_VIEW';

interface ModalState {
  view?: MODAL_VIEWS;
  data?: any;
  isOpen: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalState = new BehaviorSubject<ModalState>({
    view: undefined,
    data: null,
    isOpen: false,
  });

  modalState$ = this.modalState.asObservable();

  openModal(view: MODAL_VIEWS, data?: any) {
    console.log('open modal command execute')
    this.modalState.next({ view, data, isOpen: true });
  }

  closeModal() {
    this.modalState.next({ view: undefined, data: null, isOpen: false });
  }
}
