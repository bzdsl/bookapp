/** @format */

import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import styles from "../../assets/styles/signup.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/colors";
import { Link } from "expo-router";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = () => {};

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.container}>
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>BookShare</Text>
            <Text style={styles.subtitle}>Share your favorite books</Text>
          </View>
          <View style={styles.formContainer}>
            {/* USER INPUT */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Username"
                  style={styles.input}
                  placeholderTextColor={COLORS.placeholderText}
                  onChangeText={setUsername}
                  value={username}
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* EMAIL */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor={COLORS.placeholderText}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* PASSWORD */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder=" ********"
                  placeholderTextColor={COLORS.placeholderText}
                  value={password}
                  onChangeText={setPassword}
                  keyboardType="default"
                  autoCapitalize="none"
                  secureTextEntry={!showPassword}
                />
                {/* SEE PASSWORD */}
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}>
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* SIGN UP BUTTON */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSignup}
              disabled={isLoading}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* FOOTER */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <Link href="/(auth)" asChild>
                <TouchableOpacity>
                  <Text style={styles.link}>Login </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
