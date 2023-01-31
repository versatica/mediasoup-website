---
title   : React Native
anchors : true
---


# React Native

In order to use mediasoup-client in React Native (for building Android and iOS apps):

- Include [react-native-webrtc](https://www.npmjs.com/package/react-native-webrtc) dependency into your React Native project.
- Call mediasoup-client exposed [registerGlobals()](https://github.com/react-native-webrtc/react-native-webrtc#registerglobals) function **before** creating a mediasoup-client [Device](/documentation/v3/mediasoup-client/api/#Device-constructor) instance.

<div markdown="1" class="note">
* By calling `registerGlobals()`, classes such as `RTCPeerConnection` and `MediaStream` (among others) will be exposed in the global scope.
* Those classes are required for the `ReactNative` handler (or the new `ReactNativeUnifiedPlan` handler) of mediasoup-client to work.
</div>
