import { StyleSheet, TextInput } from "react-native";

export default function Input({ placeholderText, onChangeText }) {
    return (
      <TextInput
        style = {styles.textInput}
        placeholder = {placeholderText}
        onChangeText={onChangeText} />
    )
}

const styles = StyleSheet.create({
  textInput: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: 'blue',
    borderRadius: 5,
    width: "100%",
    height: "100%",
  },
  buttonLabel: {
    color: "white"
  },
});