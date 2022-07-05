import { AlertDialog, Button } from "native-base";
import React from "react";
const DeleteAlert = ({ loading, openDelete, onClose, onSubmitDelete }) => {
  return (
    <AlertDialog isOpen={openDelete} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>Xác nhận xóa</AlertDialog.Header>
        <AlertDialog.Body>
          Bạn có chắc chắn muốn xóa bản ghi này
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose}>
              Hủy
            </Button>
            <Button
              isLoading={loading}
              colorScheme="danger"
              onPress={onSubmitDelete}
            >
              Xóa
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};
export default DeleteAlert;
