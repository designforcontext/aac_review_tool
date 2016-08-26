require 'zlib';

class PlantUmlEncode64

    # Public : proceed to the encoding for plantuml servlet
    #
    # Returns the encoded uml to send to the servlet
    def self.encode(input)
        o = input.force_encoding("utf-8");
        o = Zlib::Deflate.new(nil, -Zlib::MAX_WBITS).deflate(o, Zlib::FINISH)
        return PlantUmlEncode64.encode64(o);
    end

    # Internal : Encode is some special base 64.
    #
    # @param a deflate string
    # Returns a encoded string
    def self.encode64(input)
        len, i, out =  input.length, 0, "";
        while i < len do
            i1 = (i+1 < len) ? input[i+1].ord : 0;
            i2 = (i+2 < len) ? input[i+2].ord : 0;
            out += append3bytes(input[i].ord, i1, i2);
            i += 3;
        end
        return out
    end

    def self.encode6bit(b)
        if b < 10 then
        return (48 + b).chr;
        end

        b -= 10;
        if b < 26 then
        return (65 + b).chr;
        end

        b -= 26;
        if b < 26 then
        return (97 + b).chr;
        end

        b -= 26;
        if b == 0 then
            return '-';
        end

        return (b == 1) ? '_' : '?';
    end

    def self.append3bytes(b1, b2, b3)
        c1 = (b1 >> 2)
        c2 = ((b1 & 0x3) << 4) | (b2 >> 4)
        c3 = ((b2 & 0xF) << 2) | (b3 >> 6)
        c4 = b3 & 0x3F;
        r = encode6bit(c1 & 0x3F)
        r += encode6bit(c2 & 0x3F);
        r += encode6bit(c3 & 0x3F);
        return r + encode6bit(c4 & 0x3F);
    end

end