import { Redirect, Route } from 'react-router-dom';
import {
  IonPage,
  IonButton,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
export default function Main() {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Main</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonButton routerLink="/login">Login</IonButton>
                <IonButton routerLink="/signup">Signup</IonButton>
                <IonButton routerLink="/menu">Menu</IonButton>
                <IonButton routerLink="/terms_and_conditions">Terms and Conditions</IonButton>
                <IonButton routerLink="/add_food">Add Food</IonButton>
                <IonButton routerLink="/add_excercise">Add Excercise</IonButton>
            </IonContent>
        </IonPage>
    );
}