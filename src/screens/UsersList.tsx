import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

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
      <TouchableOpacity
        onPress={() => props.navigation.navigate("UserProfile")}
      >
        <View
          style={{ borderColor: "black", borderWidth: 1, marginVertical: 2 }}
        >
          <Text>{item.name}</Text>
          <Text>{item.company.name}</Text>
          <Text>{item.email}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList data={users} renderItem={userTile} />
    </View>
  );
};

export default UsersList;
