// DeleteRecipeModal.js

import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const DeleteRecipeModal = ({ isVisible, onClose, onDelete }) => {
  const handleDelete = () => {
    // Call the onDelete function to delete the recipe
    onDelete();
    // Close the modal
    onClose();
  };

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Delete Recipe</Text>
          <Text>Are you sure you want to delete this recipe?</Text>
          <Button title="Delete" onPress={handleDelete} color="red" />
          <Button title="Cancel" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default DeleteRecipeModal;
