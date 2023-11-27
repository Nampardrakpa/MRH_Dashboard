import { BaseKey } from "@refinedev/core";

export interface FormFieldProp {
    title: string;
    labelName: string;
}

export interface FormValues {
    title: string;
    description: string;
    propertyType: string;
    location: string;
    price: number;
}


export interface PropertyCardProps {
    _id: string;
    title: string;
    asset: string;
    model: string;
    serial: string;
    price: string; // Update the type to number
    installationDate: string;
    expirationDate: string;
    manufacturer: string;
    warranty: string;
    photo: string;
    handleDeleteProperty: (id: string) => void;
}
























