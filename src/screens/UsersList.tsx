import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { useTheme } from "react-native-paper";

interface UserType {
  id: number;
  name: string;
  username: string;
  address: any;
  phone: string;
  website: string;
  company: any;
}

const UsersList = (props) => {
  const [users, setUsers] = useState<UserType[]>([]);

  const theme = useTheme();

  useEffect(() => {
    void (async () => {
      try {
        const usersRes = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const usersList = await usersRes.json();
        setUsers(usersList);
      } catch (error) {
        console.log("error");
      }
    })();
  }, []);

  const userTile = ({ item, index }) => {
    return (
      <View style={styles.userContainer}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1 }}>
            <Image
              source={require("./../assets/images/profile_placeholder.png")}
              style={styles.imagePlaceholder}
            />
          </View>
          <View style={styles.userDetailsContainer}>
            <View>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.company}>{item.company.name}</Text>
            </View>
            <View>
              <Text style={styles.otherInfo}>{item.email}</Text>
              <Text style={styles.otherInfo} numberOfLines={1}>
                {`${item.address.street}, ${item.address.suite}, ${item.address.city}`}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 12 }}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("UserProfile", {
                userId: item.id,
                userInfo: item,
              })
            }
          >
            <View
              style={[
                styles.buttonContainer,
                { backgroundColor: theme.colors.secondary },
              ]}
            >
              <Text
                style={[styles.buttonText, { color: theme.colors.primary }]}
              >
                View Profile
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList data={users} renderItem={userTile} />
      </View>
    </>
  );
};

export default UsersList;

const styles = StyleSheet.create({
  otherInfo: {
    fontFamily: "poppins-regular",
    fontSize: 12,
    color: "#8696BB",
    lineHeight: 14,
  },
  company: {
    fontFamily: "poppins-regular",
    fontSize: 14,
    color: "#8696BB",
  },
  title: {
    fontFamily: "poppins-bold",
    fontSize: 16,
    color: "#0D1B34",
  },
  userContainer: {
    marginVertical: 6,
    backgroundColor: "white",
    minHeight: 150,
    padding: 12,
  },
  userDetailsContainer: {
    flex: 2.5,
    justifyContent: "space-between",
  },
  buttonContainer: {
    height: 39,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "poppins-regular",
    fontSize: 14,
  },
  container: {
    flex: 1,
    marginHorizontal: 12,
    paddingBottom: 24,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
  },
});
