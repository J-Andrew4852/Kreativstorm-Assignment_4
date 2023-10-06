class Keys {
  static numberKeys = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  static operationKeys = ['+', '-', '%', '*', '/'];
  static commandKeys = ['=', 'c', 'Backspace', 'Enter'];
  static keys = [
                  ...this.numberKeys, 
                  ...this.operationKeys,
                  ...this.commandKeys
                ];
}

export default Keys;
