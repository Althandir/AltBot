

// Function to check if the Splitvalue is not a Number. 
// Returns false if invalid. True otherwise.
function IsSplitValueAtCorrectPosition(argument)
{
  //console.log("Check Splitvalue Position...")
  return isNaN(argument.charAt(2));
}

// Function to check if the Splitvalue is valid. 
// Returns false if correct. True otherwise.
function IsFalseSplitValue(argument, allowedSplitValues)
{
  //console.log("Check for correct Splitvalue...")
  for (allowedSplitValue of allowedSplitValues)
  {
    //console.log(`Check if ${allowedSplitValue} equals ${argument.charAt(2)}` )
    if(allowedSplitValue.normalize() === argument.charAt(2).normalize())
    {
      return false;
    }
  }
  return true;
}

//Function to check if argument consists out of numbers.
//Ignores the 3rd value because this should be the divider.
function IsNumericType(argument)
{
  for (value of argument)
  {
    if(argument.indexOf(value) == Math.floor(argument.length / 2))
    {
      continue;
    }
    if(isNaN(Number(value)))
    {
      return false;
    }
  }
  return true;
}

//Function to check if the argument array is not longer then 5
function HasCorrectLength(argument)
{
  if(argument.length > 5 || argument.length < 5)
  {
    return false;
  }
  return true;
}

module.exports.IsSplitValueAtCorrectPosition = IsSplitValueAtCorrectPosition;
module.exports.IsFalseSplitValue = IsFalseSplitValue;
module.exports.IsNumericType = IsNumericType;
module.exports.HasCorrectLength = HasCorrectLength;
