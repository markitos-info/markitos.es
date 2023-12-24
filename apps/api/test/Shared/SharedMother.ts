import { v4 as uuidv4 } from 'uuid';
import BadRequestException from '../../src/Services/Shared/Domain/Exception/BadRequestException';
import InternalException from '../../src/Services/Shared/Domain/Exception/InternalException';
import NotFoundException from '../../src/Services/Shared/Domain/Exception/NotFoundException';
import Base64Image from '../../src/Services/Shared/Domain/ValueObject/Base64Image';
import Base64Zip from '../../src/Services/Shared/Domain/ValueObject/Base64Zip';
import CommaTags from '../../src/Services/Shared/Domain/ValueObject/CommaTags';
import Description from '../../src/Services/Shared/Domain/ValueObject/Description';
import Email from '../../src/Services/Shared/Domain/ValueObject/Email';
import FilePath from '../../src/Services/Shared/Domain/ValueObject/FilePath';
import Id from '../../src/Services/Shared/Domain/ValueObject/Id';
import LimitedString from '../../src/Services/Shared/Domain/ValueObject/LimitedString';
import Name from '../../src/Services/Shared/Domain/ValueObject/Name';
import Password from '../../src/Services/Shared/Domain/ValueObject/Password';
import Poster from '../../src/Services/Shared/Domain/ValueObject/Poster';
import Tags from '../../src/Services/Shared/Domain/ValueObject/Tags';
import Title from '../../src/Services/Shared/Domain/ValueObject/Title';
import Youtube from '../../src/Services/Shared/Domain/ValueObject/Youtube';

export class SharedMother {
    public static TOKEN_PAYLOAD = {
        anykey: 'any random value 9d9218b7-95ce-42ec-97a7-fe4b8038c8ad',
        iat: 1701187971,
        exp: 2565101571,
    };
    public static TOKEN_CREATED: string =
        'eyJhbnlrZXkiOiJhbnkgcmFuZG9tIHZhbHVlIDlkOTIxOGI3LTk1Y2UtNDJlYy05N2E3LWZlNGI4MDM4YzhhZCIsImlhdCI6MTcwMTE4Nzk3MSwiZXhwIjoyNTY1MTAxNTcxLCJhbGciOiJIUzI1NiJ9.eyJhbnlrZXkiOiJhbnkgcmFuZG9tIHZhbHVlIDlkOTIxOGI3LTk1Y2UtNDJlYy05N2E3LWZlNGI4MDM4YzhhZCIsImlhdCI6MTcwMTE4Nzk3MSwiZXhwIjoyNTY1MTAxNTcxfQ.3NOkx31GNFJox1uISy3BBkEY65HWpikfJFWzGCw9ogk';
    public static YOUTUBE_URL: string =
        'https://www.youtube.com/watch?v=U0m9lHX8x_4';
    public static YOUTUBE_URL_2: string =
        'https://youtu.be/U0m9lHX8x_4?si=NliLO2zgZTXJme3n';
    public static YOUTUBE_URL_3: string =
        'https://www.youtube.com/embed/U0m9lHX8x_4?si=NliLO2zgZTXJme3n';
    public static YOUTUBE_URL_4: string =
        'https://www.youtube.com/watch?v=4Hf5rERu5AI&list=PL-1zlyAOA1_6hu25zBMQEa4oB7GwYKYA6';
    public static TITLE_VALUE: string = 'a'.repeat(
        LimitedString.MINIMUM_LENGTH
    );
    public static TAGS_VALUE: string[] = [
        'a'.repeat(Tags.MINIMUM_TAG_LENGTH),
        'b'.repeat(Tags.MINIMUM_TAG_LENGTH),
    ];
    public static COMMA_TAGS_VALUE: string = SharedMother.TAGS_VALUE.join(',');
    public static VALID_NAME: string = 'a'.repeat(Name.MINIMUM_TAG_LENGTH);
    public static VALID_POSTER: string =
        'http://localhost:3000/api/v1/service/344f2347-4aa8-447b-b403-ad792524e4b3';
    public static VALID_EMAIL: string = 'hola@hola.com';
    public static VALID_PASSWORD: string = 'anypassword';
    public static HELLO_WORLD_LITERAL: string = 'hello world';
    public static HELLO_WORLD_HASHED_LENGTH: number =
        SharedMother.HELLO_WORLD_LITERAL.length;
    public static VALID_ID: string = uuidv4();
    public static VALID_ID_2: string = uuidv4();
    public static VALID_ID_3: string = uuidv4();
    public static BASE64_PNG_IMAGE: string =
        'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=';
    public static BASE64_SVG_IMAGE: string =
        'PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InJlZCIvPjwvc3ZnPg==';
    public static BASE64_TEXT: string = 'bWFya2l0b3MuZXM=';
    public static BASE64_MARKDOWN_TEXT: string =
        'LS0tCl9fQWR2ZXJ0aXNlbWVudCA6KV9fCgotIF9fW3BpY2FdKGh0dHBzOi8vbm9kZWNhLmdpdGh1Yi5pby9waWNhL2RlbW8vKV9fIC0gaGlnaCBxdWFsaXR5IGFuZCBmYXN0IGltYWdlCiAgcmVzaXplIGluIGJyb3dzZXIuCi0gX19bYmFiZWxmaXNoXShodHRwczovL2dpdGh1Yi5jb20vbm9kZWNhL2JhYmVsZmlzaC8pX18gLSBkZXZlbG9wZXIgZnJpZW5kbHkKICBpMThuIHdpdGggcGx1cmFscyBzdXBwb3J0IGFuZCBlYXN5IHN5bnRheC4KCllvdSB3aWxsIGxpa2UgdGhvc2UgcHJvamVjdHMhCgotLS0KCiMgaDEgSGVhZGluZyA4LSkKIyMgaDIgSGVhZGluZwojIyMgaDMgSGVhZGluZwojIyMjIGg0IEhlYWRpbmcKIyMjIyMgaDUgSGVhZGluZwojIyMjIyMgaDYgSGVhZGluZwoKCiMjIEhvcml6b250YWwgUnVsZXMKCl9fXwoKLS0tCgoqKioKCgojIyBUeXBvZ3JhcGhpYyByZXBsYWNlbWVudHMKCkVuYWJsZSB0eXBvZ3JhcGhlciBvcHRpb24gdG8gc2VlIHJlc3VsdC4KCihjKSAoQykgKHIpIChSKSAodG0pIChUTSkgKHApIChQKSArLQoKdGVzdC4uIHRlc3QuLi4gdGVzdC4uLi4uIHRlc3Q/Li4uLi4gdGVzdCEuLi4uCgohISEhISEgPz8/PyAsLCAgLS0gLS0tCgoiU21hcnR5cGFudHMsIGRvdWJsZSBxdW90ZXMiIGFuZCAnc2luZ2xlIHF1b3RlcycKCgojIyBFbXBoYXNpcwoKKipUaGlzIGlzIGJvbGQgdGV4dCoqCgpfX1RoaXMgaXMgYm9sZCB0ZXh0X18KCipUaGlzIGlzIGl0YWxpYyB0ZXh0KgoKX1RoaXMgaXMgaXRhbGljIHRleHRfCgp+flN0cmlrZXRocm91Z2h+fgoKCiMjIEJsb2NrcXVvdGVzCgoKPiBCbG9ja3F1b3RlcyBjYW4gYWxzbyBiZSBuZXN0ZWQuLi4KPj4gLi4uYnkgdXNpbmcgYWRkaXRpb25hbCBncmVhdGVyLXRoYW4gc2lnbnMgcmlnaHQgbmV4dCB0byBlYWNoIG90aGVyLi4uCj4gPiA+IC4uLm9yIHdpdGggc3BhY2VzIGJldHdlZW4gYXJyb3dzLgoKCiMjIExpc3RzCgpVbm9yZGVyZWQKCisgQ3JlYXRlIGEgbGlzdCBieSBzdGFydGluZyBhIGxpbmUgd2l0aCBgK2AsIGAtYCwgb3IgYCpgCisgU3ViLWxpc3RzIGFyZSBtYWRlIGJ5IGluZGVudGluZyAyIHNwYWNlczoKICAtIE1hcmtlciBjaGFyYWN0ZXIgY2hhbmdlIGZvcmNlcyBuZXcgbGlzdCBzdGFydDoKICAgICogQWMgdHJpc3RpcXVlIGxpYmVybyB2b2x1dHBhdCBhdAogICAgKyBGYWNpbGlzaXMgaW4gcHJldGl1bSBuaXNsIGFsaXF1ZXQKICAgIC0gTnVsbGEgdm9sdXRwYXQgYWxpcXVhbSB2ZWxpdAorIFZlcnkgZWFzeSEKCk9yZGVyZWQKCjEuIExvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0CjIuIENvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdAozLiBJbnRlZ2VyIG1vbGVzdGllIGxvcmVtIGF0IG1hc3NhCgoKMS4gWW91IGNhbiB1c2Ugc2VxdWVudGlhbCBudW1iZXJzLi4uCjEuIC4uLm9yIGtlZXAgYWxsIHRoZSBudW1iZXJzIGFzIGAxLmAKClN0YXJ0IG51bWJlcmluZyB3aXRoIG9mZnNldDoKCjU3LiBmb28KMS4gYmFyCgoKIyMgQ29kZQoKSW5saW5lIGBjb2RlYAoKSW5kZW50ZWQgY29kZQoKICAgIC8vIFNvbWUgY29tbWVudHMKICAgIGxpbmUgMSBvZiBjb2RlCiAgICBsaW5lIDIgb2YgY29kZQogICAgbGluZSAzIG9mIGNvZGUKCgpCbG9jayBjb2RlICJmZW5jZXMiCgpgYGAKU2FtcGxlIHRleHQgaGVyZS4uLgpgYGAKClN5bnRheCBoaWdobGlnaHRpbmcKCmBgYCBqcwp2YXIgZm9vID0gZnVuY3Rpb24gKGJhcikgewogIHJldHVybiBiYXIrKzsKfTsKCmNvbnNvbGUubG9nKGZvbyg1KSk7CmBgYAoKIyMgVGFibGVzCgp8IE9wdGlvbiB8IERlc2NyaXB0aW9uIHwKfCAtLS0tLS0gfCAtLS0tLS0tLS0tLSB8CnwgZGF0YSAgIHwgcGF0aCB0byBkYXRhIGZpbGVzIHRvIHN1cHBseSB0aGUgZGF0YSB0aGF0IHdpbGwgYmUgcGFzc2VkIGludG8gdGVtcGxhdGVzLiB8CnwgZW5naW5lIHwgZW5naW5lIHRvIGJlIHVzZWQgZm9yIHByb2Nlc3NpbmcgdGVtcGxhdGVzLiBIYW5kbGViYXJzIGlzIHRoZSBkZWZhdWx0LiB8CnwgZXh0ICAgIHwgZXh0ZW5zaW9uIHRvIGJlIHVzZWQgZm9yIGRlc3QgZmlsZXMuIHwKClJpZ2h0IGFsaWduZWQgY29sdW1ucwoKfCBPcHRpb24gfCBEZXNjcmlwdGlvbiB8CnwgLS0tLS0tOnwgLS0tLS0tLS0tLS06fAp8IGRhdGEgICB8IHBhdGggdG8gZGF0YSBmaWxlcyB0byBzdXBwbHkgdGhlIGRhdGEgdGhhdCB3aWxsIGJlIHBhc3NlZCBpbnRvIHRlbXBsYXRlcy4gfAp8IGVuZ2luZSB8IGVuZ2luZSB0byBiZSB1c2VkIGZvciBwcm9jZXNzaW5nIHRlbXBsYXRlcy4gSGFuZGxlYmFycyBpcyB0aGUgZGVmYXVsdC4gfAp8IGV4dCAgICB8IGV4dGVuc2lvbiB0byBiZSB1c2VkIGZvciBkZXN0IGZpbGVzLiB8CgoKIyMgTGlua3MKCltsaW5rIHRleHRdKGh0dHA6Ly9kZXYubm9kZWNhLmNvbSkKCltsaW5rIHdpdGggdGl0bGVdKGh0dHA6Ly9ub2RlY2EuZ2l0aHViLmlvL3BpY2EvZGVtby8gInRpdGxlIHRleHQhIikKCkF1dG9jb252ZXJ0ZWQgbGluayBodHRwczovL2dpdGh1Yi5jb20vbm9kZWNhL3BpY2EgKGVuYWJsZSBsaW5raWZ5IHRvIHNlZSkKCgojIyBJbWFnZXMKCiFbTWluaW9uXShodHRwczovL29jdG9kZXguZ2l0aHViLmNvbS9pbWFnZXMvbWluaW9uLnBuZykKIVtTdG9ybXRyb29wb2NhdF0oaHR0cHM6Ly9vY3RvZGV4LmdpdGh1Yi5jb20vaW1hZ2VzL3N0b3JtdHJvb3BvY2F0LmpwZyAiVGhlIFN0b3JtdHJvb3BvY2F0IikKCkxpa2UgbGlua3MsIEltYWdlcyBhbHNvIGhhdmUgYSBmb290bm90ZSBzdHlsZSBzeW50YXgKCiFbQWx0IHRleHRdW2lkXQoKV2l0aCBhIHJlZmVyZW5jZSBsYXRlciBpbiB0aGUgZG9jdW1lbnQgZGVmaW5pbmcgdGhlIFVSTCBsb2NhdGlvbjoKCltpZF06IGh0dHBzOi8vb2N0b2RleC5naXRodWIuY29tL2ltYWdlcy9kb2pvY2F0LmpwZyAgIlRoZSBEb2pvY2F0IgoKCiMjIFBsdWdpbnMKClRoZSBraWxsZXIgZmVhdHVyZSBvZiBgbWFya2Rvd24taXRgIGlzIHZlcnkgZWZmZWN0aXZlIHN1cHBvcnQgb2YKW3N5bnRheCBwbHVnaW5zXShodHRwczovL3d3dy5ucG1qcy5vcmcvYnJvd3NlL2tleXdvcmQvbWFya2Rvd24taXQtcGx1Z2luKS4KCgojIyMgW0Vtb2ppZXNdKGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJrZG93bi1pdC9tYXJrZG93bi1pdC1lbW9qaSkKCj4gQ2xhc3NpYyBtYXJrdXA6IDp3aW5rOiA6Y3J1c2g6IDpjcnk6IDp0ZWFyOiA6bGF1Z2hpbmc6IDp5dW06Cj4KPiBTaG9ydGN1dHMgKGVtb3RpY29ucyk6IDotKSA6LSggOC0pIDspCgpzZWUgW2hvdyB0byBjaGFuZ2Ugb3V0cHV0XShodHRwczovL2dpdGh1Yi5jb20vbWFya2Rvd24taXQvbWFya2Rvd24taXQtZW1vamkjY2hhbmdlLW91dHB1dCkgd2l0aCB0d2Vtb2ppLgoKCiMjIyBbU3Vic2NyaXB0XShodHRwczovL2dpdGh1Yi5jb20vbWFya2Rvd24taXQvbWFya2Rvd24taXQtc3ViKSAvIFtTdXBlcnNjcmlwdF0oaHR0cHM6Ly9naXRodWIuY29tL21hcmtkb3duLWl0L21hcmtkb3duLWl0LXN1cCkKCi0gMTledGheCi0gSH4yfk8KCgojIyMgW1w8aW5zPl0oaHR0cHM6Ly9naXRodWIuY29tL21hcmtkb3duLWl0L21hcmtkb3duLWl0LWlucykKCisrSW5zZXJ0ZWQgdGV4dCsrCgoKIyMjIFtcPG1hcms+XShodHRwczovL2dpdGh1Yi5jb20vbWFya2Rvd24taXQvbWFya2Rvd24taXQtbWFyaykKCj09TWFya2VkIHRleHQ9PQoKCiMjIyBbRm9vdG5vdGVzXShodHRwczovL2dpdGh1Yi5jb20vbWFya2Rvd24taXQvbWFya2Rvd24taXQtZm9vdG5vdGUpCgpGb290bm90ZSAxIGxpbmtbXmZpcnN0XS4KCkZvb3Rub3RlIDIgbGlua1tec2Vjb25kXS4KCklubGluZSBmb290bm90ZV5bVGV4dCBvZiBpbmxpbmUgZm9vdG5vdGVdIGRlZmluaXRpb24uCgpEdXBsaWNhdGVkIGZvb3Rub3RlIHJlZmVyZW5jZVtec2Vjb25kXS4KClteZmlyc3RdOiBGb290bm90ZSAqKmNhbiBoYXZlIG1hcmt1cCoqCgogICAgYW5kIG11bHRpcGxlIHBhcmFncmFwaHMuCgpbXnNlY29uZF06IEZvb3Rub3RlIHRleHQuCgoKIyMjIFtEZWZpbml0aW9uIGxpc3RzXShodHRwczovL2dpdGh1Yi5jb20vbWFya2Rvd24taXQvbWFya2Rvd24taXQtZGVmbGlzdCkKClRlcm0gMQoKOiAgIERlZmluaXRpb24gMQp3aXRoIGxhenkgY29udGludWF0aW9uLgoKVGVybSAyIHdpdGggKmlubGluZSBtYXJrdXAqCgo6ICAgRGVmaW5pdGlvbiAyCgogICAgICAgIHsgc29tZSBjb2RlLCBwYXJ0IG9mIERlZmluaXRpb24gMiB9CgogICAgVGhpcmQgcGFyYWdyYXBoIG9mIGRlZmluaXRpb24gMi4KCl9Db21wYWN0IHN0eWxlOl8KClRlcm0gMQogIH4gRGVmaW5pdGlvbiAxCgpUZXJtIDIKICB+IERlZmluaXRpb24gMmEKICB+IERlZmluaXRpb24gMmIKCgojIyMgW0FiYnJldmlhdGlvbnNdKGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJrZG93bi1pdC9tYXJrZG93bi1pdC1hYmJyKQoKVGhpcyBpcyBIVE1MIGFiYnJldmlhdGlvbiBleGFtcGxlLgoKSXQgY29udmVydHMgIkhUTUwiLCBidXQga2VlcCBpbnRhY3QgcGFydGlhbCBlbnRyaWVzIGxpa2UgInh4eEhUTUx5eXkiIGFuZCBzbyBvbi4KCipbSFRNTF06IEh5cGVyIFRleHQgTWFya3VwIExhbmd1YWdlCgojIyMgW0N1c3RvbSBjb250YWluZXJzXShodHRwczovL2dpdGh1Yi5jb20vbWFya2Rvd24taXQvbWFya2Rvd24taXQtY29udGFpbmVyKQoKOjo6IHdhcm5pbmcKKmhlcmUgYmUgZHJhZ29ucyoKOjo6Cg==';
    public static BASE64_ZIP: string =
        'UEsDBBQACAAIAJ1VbFcAAAAAAAAAAEYAAAAQACAAMXgxLWZmMDAwMDdmLnBuZ1VUDQAHm55QZZ2eUGWbnlBldXgLAAEE9wEAAAQUAAAA6wzwc+flkuJiYGDg9fRwCQLSjCDMwQYk5UWPdIIlXBxDKm4l/zl/IICfgaWVsaFlZY8iUILB09XPZZ1TQhMAUEsHCCaklQc/AAAARgAAAFBLAwQUAAgACACdVWxXAAAAAAAAAADfAQAAGwAgAF9fTUFDT1NYLy5fMXgxLWZmMDAwMDdmLnBuZ1VUDQAHm55QZZ2eUGXZnlBldXgLAAEE9wEAAAQUAAAAY2AVY2dgYmDwTUxW8A9WiFCAApAYAycQGzEwMK4F0kA+430GooBjSEgQhAXSwcgCZNxGU8ICFfdgYOBPzs/VSywoyEnVy01MzoHo8wESBQwMqkhyqSWJKYkliVbZvi6eJam54RmpRaluRfm5xSD1e4AENwODKEJ9QVF+WWpeYl5yKkj+OJCQQJEvLE0sSswrycwDyjfe5zu1N3y55/JF/nXtl/WWfiLOn+ggqSAns7jEwGARI1O8gFpGSUlBsZW+fkFeum5BZkVqjh7Qcn3DCkPdtDQDIDBP0wNKxQuIYVfIwW0CDUNGqPHMaNb5MjIxTN18/e8768+uhfoGBhaG1mampgaWqZZJ1s4ZwJBJtWYAAFBLBwgxJqsAEgEAAN8BAABQSwECFAMUAAgACACdVWxXJqSVBz8AAABGAAAAEAAgAAAAAAAAAAAApIEAAAAAMXgxLWZmMDAwMDdmLnBuZ1VUDQAHm55QZZ2eUGWbnlBldXgLAAEE9wEAAAQUAAAAUEsBAhQDFAAIAAgAnVVsVzEmqwASAQAA3wEAABsAIAAAAAAAAAAAAKSBnQAAAF9fTUFDT1NYLy5fMXgxLWZmMDAwMDdmLnBuZ1VUDQAHm55QZZ2eUGXZnlBldXgLAAEE9wEAAAQUAAAAUEsFBgAAAAACAAIAxwAAABgCAAAAAA==';

    public static Name(value?: string): Name {
        return new Name(value !== undefined ? value : SharedMother.VALID_NAME);
    }

    public static Poster(value?: string): Poster {
        return new Poster(
            value !== undefined ? value : SharedMother.VALID_POSTER
        );
    }

    public static FilePath(value?: string): FilePath {
        return new FilePath(
            value !== undefined ? value : (__filename as string)
        );
    }

    public static Youtube(value?: string): Youtube {
        return new Youtube(
            value !== undefined ? value : SharedMother.YOUTUBE_URL
        );
    }

    public static Base64Zip(value?: string): Base64Zip {
        return new Base64Zip(
            value !== undefined ? value : SharedMother.BASE64_ZIP
        );
    }

    public static Base64Image(value?: string): Base64Image {
        return new Base64Image(
            value !== undefined ? value : SharedMother.BASE64_PNG_IMAGE
        );
    }

    static Email(value?: string): Email {
        return new Email(
            value !== undefined ? value : SharedMother.VALID_EMAIL
        );
    }
    public static Description(value?: string): Description {
        return new Description(
            value !== undefined ? value : SharedMother.BASE64_TEXT
        );
    }

    static Password(value?: string): Password {
        return new Password(
            value !== undefined ? value : SharedMother.VALID_PASSWORD
        );
    }

    public static Id(value?: string): Id {
        return new Id(value !== undefined ? value : SharedMother.VALID_ID);
    }

    public static CommaTags(value?: string): CommaTags {
        return new CommaTags(
            value !== undefined ? value : SharedMother.COMMA_TAGS_VALUE
        );
    }

    public static Tags(value?: string[]): Tags {
        return new Tags(value !== undefined ? value : SharedMother.TAGS_VALUE);
    }

    public static Title(value?: string): Title {
        return new Title(
            value !== undefined ? value : SharedMother.BASE64_TEXT
        );
    }
    
    public static LimitedString(value?: string): LimitedString {
        return new LimitedString(
            value !== undefined
                ? value
                : 'a'.repeat(LimitedString.MINIMUM_LENGTH)
        );
    }
    public static BadRequestException(): BadRequestException {
        return new BadRequestException();
    }
    public static NotFoundException(): NotFoundException {
        return new NotFoundException();
    }
    public static InternalException(): InternalException {
        return new InternalException();
    }
}
