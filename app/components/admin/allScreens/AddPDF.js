import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Icon } from '@rneui/themed';
import Btn from '../../Btn';
import { darkGreen } from '../../Constants';

const categories = [
  { label: 'First Year', value: 'first_year' },
  { label: 'Second Year', value: 'second_year' },
];

const AddPDF = () => {
  const [category, setCategory] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [youtubeLinks, setYoutubeLinks] = useState([]);
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [year, setYear] = useState(null);
  const [youtubeLinkInput, setYoutubeLinkInput] = useState('');

  const data = categories;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (selectedYear) => {
    setYear(selectedYear);
    setIsOpen(false);
    handleCategorySelect(selectedYear);
  };

  const handleCategorySelect = (value) => {
    setCategory(value);
  };

  const url = "https://server-git-main-aunmuhammad1.vercel.app/";

  const handlePdfUpload = async () => {
    try {
        const result = await DocumentPicker.getDocumentAsync({
            type: 'application/pdf', // You can specify the MIME type here
        });
        if (!result.cancelled) {
            setPdfFile(result);
            const formData = new FormData();
            formData.append('pdfFile', {
              uri: result.assets[0].uri,
              type: result.assets[0].mimeType,
              name: result.assets[0].name,
            });
            const response = await fetch(url + 'upload-pdf', {
                method: 'POST',
                body: formData,
            });
            console.log(formData);
            console.log(response);
            if (response.ok) {
                // The file was successfully uploaded
                console.log('File uploaded successfully:', response);
            } else {
                // Handle the case where the server returns an error
                console.error('Upload failed with status:', response.status);
            }
        }
    } catch (err) {
        console.log(err);
    }
  };

  const handleYoutubeLinkAdd = (link) => {
    setYoutubeLinks([...youtubeLinks, link]);
    setYoutubeLinkInput('');
  };

  const handleSubmit = () => {
    // Validate form data
    const errors = {};
    if (!category) {
      errors.category = 'Please select a category';
    }
    if (!pdfFile) {
      errors.pdfFile = 'Please upload a PDF file';
    }
    if (youtubeLinks.length === 0) {
      errors.youtubeLinks = 'Please add at least one YouTube link';
    }
    setErrors(errors);

    // Submit form if there are no errors
    if (Object.keys(errors).length === 0) {
      
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <Text style={styles.label}>Select a category:</Text>
        <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
          <View>
            <Text style={styles.textStyle}>{year || 'Select an option........'}</Text>
          </View>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isOpen}
          onRequestClose={() => setIsOpen(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setIsOpen(false)}
          >
            <View style={styles.modalContent}>
              <FlatList
                data={data}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelect(item.label)}>
                    <Text style={styles.modalItem}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
        {errors.category && <Text style={styles.error}>{errors.category}</Text>}
      </View>
      <View style={styles.pdfContainer}>
        <Text style={styles.label}>Upload a PDF file:</Text>
        <View style={{ alignItems:"center" }}><Btn bgColor={ darkGreen } textColor='white' btnLabel="Choose File" Press={handlePdfUpload} /></View>
        {pdfFile && <Text style={styles.pdfFileName}>{pdfFile.assets[0].name}</Text>}
        {errors.pdfFile && <Text style={styles.error}>{errors.pdfFile}</Text>}
      </View>
      <View style={styles.youtubeContainer}>
        <Text style={styles.label}>Add YouTube links:</Text>
        <TextInput
            style={styles.youtubeInput}
            placeholder="Enter a link"    
            value={youtubeLinkInput}
            onChangeText={setYoutubeLinkInput}
            onSubmitEditing={(event) => {
                handleYoutubeLinkAdd(event.nativeEvent.text);
            }}
        />
        {youtubeLinks.map((link, index) => (
            <View key={index} style={
                { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }
            }>
                
                <Text style={styles.youtubeLink}>
                    {link} 
                </Text>
                <TouchableOpacity onPress={
                    () => setYoutubeLinks(youtubeLinks.filter((_, i) => i !== index))
                }>
                    <Icon name="close" borderRadius= {25} size={20} color="white" backgroundColor="black"/>
                </TouchableOpacity>
            </View>
        ))}
        {errors.youtubeLinks && <Text style={styles.error}>{errors.youtubeLinks}</Text>}
      </View>
      <View style={{ alignItems:"center" }}><Btn bgColor={ darkGreen } textColor='white' btnLabel="Submit" Press={handleSubmit} /></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pdfContainer: {
    marginBottom: 20,
  },
  pdfFileName: {
    fontSize: 14,
    marginTop: 5,
  },
  youtubeContainer: {
    marginBottom: 20,
  },
  youtubeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  youtubeLink: {
    fontSize: 14,
    marginBottom: 5,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  // Add styles for the dropdown and modal here
  // You can customize them based on your design requirements
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    marginTop: 104,
    marginRight: 21,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    height: 130,
  },
  modalItem: {
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default AddPDF;
