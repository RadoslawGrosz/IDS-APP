import { Button, Card, Text, TextInput, Snackbar } from "react-native-paper";
import LoginForm from "./LoginForm";
import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useTranslation } from "../../App";
import { UserCredentials } from "../../types";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  // email: yup.string().required("@validation.Required"),
  // password: yup.string().required("@validation.Required"),
  email: yup.string(),
  password: yup.string(),
});

const LoginView = () => {
  const { i18n } = useTranslation();
  const { login, logout } = useAuth();
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  const { handleSubmit, formState, control } = useForm<UserCredentials>({
    resolver: yupResolver(schema),
  });

  const handleLogin = handleSubmit(async (data) => {
    try {
      // onToggleSnackBar();
      // await login(data.email, data.password);
      await login("bogmar-brembo-storekeeper@i4b.pl", "mUy^guh55");
      onToggleSnackBar();
      // enqueueSnackbar(t('LoginSuccess'), {
      //   variant: 'success'
      // });
      // rememberMe === false && (window.onbeforeunload = logout);
    } catch {
      // enqueueSnackbar(t('LoginError'), {
      //   variant: 'error'
      // });
    }
  });

  return (
    <Card style={styles.container}>
      <View style={{ padding: 20 }}>
        <Text variant="titleLarge">{i18n.t("signIn")}</Text>
      </View>
      <View style={{ marginBottom: 10 }}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <TextInput
              label="Email"
              value={field.value}
              onChangeText={field.onChange}
              error={!!error}
            />
          )}
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <TextInput
              label="password"
              value={field.value}
              onChangeText={field.onChange}
              error={!!error}
            />
          )}
        />
      </View>
      <View>
        <Button onPress={handleLogin} loading={formState.isSubmitting}>
          Login
        </Button>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Undo",
          onPress: () => {
            // Do something
          },
        }}
      >
        Hey there! I'm a Snackbar.
      </Snackbar>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "rgb(244, 245, 247)",
    // flex: 1,
    display: "flex",
    // alignItems: "center",
    justifyContent: "flex-start",
    // flexShrink: 1,
    // height: "100%",
    // overflow: "hidden",
    // width: "100%",
  },
  card: {
    // backgroundColor: "rgb(244, 245, 247)",
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // height: "100%",
    // overflow: "hidden",
    // width: "100%",
  },
  cardContent: {
    // paddingTop: 20,
    // paddingBottom: 20,
  },
  loginFormContainer: {
    // flexGrow: 1,
    // mt: 6,
    // width: 600,
  },
});

export default LoginView;
