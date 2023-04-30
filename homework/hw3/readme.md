# Homework 3

# About App Template

Scaffolding project to copy into new projects

Steps to reproduce AppTemplate

## 1. Project scaffolding
```
npx react-native@latest init AppTemplate
```

## 2. xcode setup
Open `ios/AppTemplate.xcodeproj` and:

1. Manage Run Destinations, and select phone
2. Remove all simulators
3. Under project, select Signing & Capabilities. 
4. org.tpr.tests.AppTemplate & Signing to personal team
5. Quit XCode

## 3. Clean project

```
npx react-native clean
(select all)
Update index.js and App.tsx
```

## 4. Personalize

```
cp -r AppTemplate <new project>
cd <new project>

for i in $(find . -name "*AppTemplate*" -print); do mv "$i" "$(echo $i | sed 's/AppTemplate/<new project>/g')"; done

for i in $(find . -type f -exec grep -Il "" {} \;); do sed -i "" 's/AppTemplate/<new project>/g' $i; done

npm install
npx pod-install
```

## 5 reconnect signing
Open XCode and go to the project Signing & Capabilities. Make sure signing is reenabled.