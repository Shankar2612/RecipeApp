export const inputChecks = (type, name) => {
  if (type === "text") {
    return { required: "*Please fill this field" };
  } else if (type === "email") {
    return {
      required: "*Please fill this field",
      pattern:
        /^[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*$/,
    };
  } else if (type === "number") {
    switch (name) {
      case "mobile":
        return {
          required: "*Please fill this field",
          minLength: { value: 10, message: "*Invalid mobile number " },
          maxLength: { value: 10, message: "*Invalid mobile number" },
        };
      case "postalCode":
        return {
          required: "*Please fill this field",
          minLength: { value: 6, message: "*Invalid postal code" },
          maxLength: { value: 6, message: "*Invalid postal code" },
        };
      default:
        return { required: "*Please fill this field" };
    }
  } else if (type === "password") {
    return {
      required: "*Please fill this field",
      pattern: {
        value:
          /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
        message:
          "*Password should be 8-20 characters and include at least 1 letter, 1 number, and 1 special character",
      },
    };
  }
};
