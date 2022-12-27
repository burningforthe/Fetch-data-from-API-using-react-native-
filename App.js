import React, { useEffect, useReducer } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { actionCreators, initialState, reducer } from './src/action'

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    async function fetchPosts() {
      dispatch(actionCreators.loading())

      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts'
        ) 
        const posts = await response.json()
        dispatch(actionCreators.success(posts))
      } catch (e) {
        dispatch(actionCreators.failure())
      }
    }

    fetchPosts()
  }, [])

  if (state === undefined) { 
    return (
      <View style={styles.center}>
        <Text>Failed to load posts!</Text>
      </View>
    )
  }
  
  const { posts} = state;
  return (
    <FlatList
      style={styles.container}
      keyExtractor={(post) => post.id}
      data={posts}
      renderItem={({ item, index }) => {
        const { id, title, body } = item;
        return (
          <View key={id} style={styles.post}>
            <Text style={styles.title}>
              {index}. {title}
            </Text>
            <Text style={styles.body}>{body}</Text>
          </View>
        );
      }}
    />
  )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  post: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    paddingVertical: 20,
    paddingRight: 20,
    marginLeft: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  body: {
    marginTop: 10,
    fontSize: 14,
    color: 'black',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
