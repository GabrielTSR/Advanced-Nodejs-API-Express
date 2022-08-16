export class PersonController {
    speak(name?: string) {
        console.log('A');
        return `Òlá ${name?.toUpperCase() ?? 'Fulano!'}`;
    }
}
