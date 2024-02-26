import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const UserProfile = (props) => {
  const { userId, userInfo } = props.route.params;
  const [userPosts, setUserPosts] = useState([]);

  const theme = useTheme();

  //get posts from user
  useEffect(() => {
    void (async () => {
      try {
        const userPostsRes = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );
        const userPostsData = await userPostsRes.json();
        setUserPosts(userPostsData);
      } catch (error) {
        console.log("error");
      }
    })();
  }, []);

  const userPostTile = ({ item, index }) => {
    const title = item.title.charAt(0).toUpperCase() + item.title.slice(1);

    return (
      <View
        style={[
          styles.postContainer,
          { marginBottom: userPosts.length - 1 === index ? 24 : 0 },
        ]}
      >
        <Text style={[styles.postText, { fontFamily: "poppins-medium" }]}>
          {title}
        </Text>
        <Text style={[styles.postText, styles.postBody]}>{item.body}</Text>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <>
        <View style={styles.profileContainer}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <Image
              source={require("./../assets/images/profile_placeholder.png")}
              style={styles.imagePlaceholder}
            />
            <Text style={styles.userName}>{userInfo.name}</Text>
            <Text style={styles.userCompany}>{userInfo.company.name}</Text>
            <Text style={styles.companyCatchPhrase}>
              {userInfo.company.catchPhrase}
            </Text>
          </View>
        </View>
        <View style={styles.userInfoContainer}>
          <View
            style={[styles.userInfo, { backgroundColor: theme.colors.primary }]}
          >
            <View style={styles.infoWithIconContainer}>
              <Image
                style={styles.icon}
                source={require("./../assets/images/home.png")}
              />
              <Text
                style={styles.infoText}
                numberOfLines={2}
              >{`Lives in ${userInfo.address.street}, ${userInfo.address.suite}, ${userInfo.address.city}`}</Text>
            </View>
            <View style={styles.infoWithIconContainer}>
              <Image
                style={styles.icon}
                source={require("./../assets/images/envelope.png")}
              />

              <Text style={styles.infoText} numberOfLines={2}>
                {userInfo.email}
              </Text>
            </View>
            <View style={styles.infoWithIconContainer}>
              <Image
                style={styles.icon}
                source={require("./../assets/images/phone-call.png")}
              />
              <Text style={styles.infoText} numberOfLines={2}>
                {userInfo.phone}
              </Text>
            </View>
            <View style={styles.infoWithIconContainer}>
              <Image
                style={styles.icon}
                source={require("./../assets/images/globe.png")}
              />
              <Text style={styles.infoText} numberOfLines={2}>
                {userInfo.website}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.labelPostContainer}>
          <Text style={styles.labelPostText}>Posts</Text>
        </View>
      </>
    );
  };

  return (
    <FlatList
      data={userPosts}
      renderItem={userPostTile}
      ListHeaderComponent={renderHeader}
    />
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "white",
    minHeight: 100,
    marginHorizontal: 12,
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
  },
  postText: {
    color: "#0D1B34",
    fontSize: 14,
  },
  postBody: {
    fontFamily: "poppins-regular",
    textAlign: "left",
    marginTop: 4,
  },
  profileContainer: {
    height: 220,
    backgroundColor: "white",
    padding: 26,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
  },
  userName: {
    color: "#0D1B34",
    fontFamily: "poppins-bold",
    fontSize: 22,
    lineHeight: 26,
    marginTop: 16,
  },
  userCompany: {
    color: "#8696BB",
    fontFamily: "poppins-regular",
    fontSize: 16,
    lineHeight: 24,
  },
  companyCatchPhrase: {
    color: "#8696BB",
    fontFamily: "poppins-regular-italic",
    fontSize: 14,
  },
  userInfoContainer: {
    backgroundColor: "white",
    paddingBottom: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    minHeight: 90,
    marginHorizontal: 12,
    borderRadius: 10,
    padding: 12,
  },
  infoWithIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 12,
  },
  infoText: {
    fontFamily: "poppins-regular",
    fontSize: 14,
    color: "white",
  },
  labelPostContainer: {
    marginHorizontal: 12,
  },
  labelPostText: {
    marginTop: 12,
    fontFamily: "poppins-regular",
    color: "#8696BB",
    fontSize: 14,
  },
});
