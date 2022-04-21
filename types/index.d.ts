import { Message, Client, Chat } from "whatsapp-web.js";
import { EventEmitter } from "node:events";

// declare module "wwebjs-sender" {
export interface MessageEmbedConstructorData {
    /** The size in pixel of this embed */
    px?: number;
    /** The title of this embed */
    title?: string;
    /** The description of this embed */
    description?: string;
    /** The timestamp of this embed */
    timestamp?: string | number | Date;
    /** The fields of this embed */
    fields?: EmbedField[];
    /** The footer of this embed */
    footer?: string;
}

/** Represents a field of a MessageEmbed */
export interface EmbedField {
    /** The name of this field */
    name: string;
    /** The value of this field */
    value: string;
}

export interface APIEmbed {
    px?: number;
    title?: string;
    description?: string;
    timestamp?: Date;
    fields?: EmbedField[];
    footer?: string;
}

/**
 * Represents an embed in a message with strings ascii design
 */
export class MessageEmbed {
    public constructor(data: MessageEmbedConstructorData, skipValidation?: boolean);

    /** The size in pixel of this embed */
    public px?: number;
    /** The title of this embed */
    public title?: string;
    /** The description of this embed */
    public description?: string;
    /** The timestamp of this embed */
    public timestamp?: string | number | Date;
    /** The fields of this embed */
    public fields?: EmbedField[];
    /** The footer of this embed */
    public footer?: string;

    /**
     * Checks if this embed is equal to another one by comparing every single one of their properties.
     * @param {MessageEmbed|APIEmbed} embed The embed to compare with
     */
    public equals(embed: MessageEmbed): boolean;

    /**
     * Sets The size in pixel of this embed.
     * @param {number} px The pixels
     */
    public sizeEmbed(px: number): MessageEmbed;

    /**
     * Adds a field to the embed.
     * @param {string} name The name of this field
     * @param {string} value The value of this field
     */
    public addField(name: string, value: string): MessageEmbed;

    /**
     * Adds fields to the embed.
     * @param {EmbedField[]} fields The fields to add
     */
    public addFields(...fields: EmbedField[]): MessageEmbed;

    /**
     * Sets the description of this embed.
     * @param {string} description The description
     */
    public setDescription(description: string): MessageEmbed;

    /**
     * Sets the footer of this embed.
     * @param {string} footer The footer
     * @returns {MessageEmbed}
     */
    public setFooter(footer: string): MessageEmbed;

    /**
     * Sets the timestamp of this embed.
     * @param {*} [timestamp=Date.now()] The timestamp or date
     * If no timestamp is provided, current time will be used
     */
    public setTimestamp(timestamp?: string | number | Date): MessageEmbed;

    /**
     * Sets the title of this embed.
     * @param {string} title The title
     */
    public setTitle(title: string): MessageEmbed;

    /** Object representation of this embed */
    public toJSON(): APIEmbed;

    /**
     * Normalizes field input and verifies strings.
     * @param {string} name The name of the field
     * @param {string} value The value of the field
     */
    public static normalizeField(name: string, value: string): EmbedField;

    /**
     * Normalizes fields input and verifies strings.
     * @param {EmbedField[]} fields The fields
     */
    public static normalizeFields(...fields: EmbedField[]): EmbedField[];
}

export class MessageButton {
    public constructor();

    public id: string;
    public label: string;

    public id_btn: MessageButton;
    public label_btn: MessageButton;

    /**
     * Sets the custom id of this button.
     * @param {string} id The custom id of the button
     * @returns {MessageButton}
     */
    public setCustomId(id: string): MessageButton;

    /**
     * Sets the label of this button.
     * @param {string} label The label of the button
     * @returns {MessageButton}
     */
    public setLabel(label: string): MessageButton;

    /**
     * Represents the possible options for a MessageButton
     */
    build(): MessageButton;
}

/**
 * Reply a message with a MessageEmbed string
 * @param {Message} [params.message] The message to reply
 * @param {MessageEmbed} [params.embed] The embed to reply
 */
export function reply(params: { message: Message; embed: MessageEmbed }): void;

/**
 * Send a message with buttons or MessageEmbed to a number
 */
export function send(params: { client: Client; number: number; embed: MessageEmbed; button: MessageButton }): void;

/**
 * Represents an Message Collector.
 */
export class Collector extends EventEmitter {
    public constructor(
        client: Client,
        chat: Chat,
        time: number,
        number: string,
        embed: MessageEmbed[],
        max: number[],
        question: string[]
    );

    public initialize(): Promise<void>;
    public messageQuestionCollector(): Promise<Message[]>;
    public embedQuestionCollector(): Promise<Message[]>;
}
