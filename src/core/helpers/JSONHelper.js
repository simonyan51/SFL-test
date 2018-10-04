class JSONHelper {
    
    static stringify(value) {
        try {
            return JSON.stringify(value);
        } catch(err) {
            console.error(err);
        }
    }

    static parse(string) {
        try {
            return JSON.parse(string);
        } catch(err) {
            console.error(err);
        }
    }
}

export default JSONHelper;