import { ChatContatosCotatoSelEffects } from './chat-contatos-sel.effec';
import { ChatAtivosEffects } from './chat-ativos.effect';
import { ChatContatosEffects } from './chat-contatos.effect';
import { ChatEsperaEffects } from './chat-espera.effect';
import { LoginEffects } from './login.effect'
import { ConfigEffects } from './config.effect'
import { ChatMensagemEffects } from './chat-message.effect'
import { ChatAtivosCotatoSelEffects } from './chat-ativos-sel.effects';
import { ChatEsperaCotatoSelEffects } from './chat-espera-sel.effec';


export const EffectsArray: any[] = [ ChatAtivosEffects,
                                     ChatContatosEffects,
                                     ChatEsperaEffects,
                                     LoginEffects,
                                     ConfigEffects,
                                     ChatMensagemEffects ,
                                     ChatAtivosEffects,
                                     ChatAtivosCotatoSelEffects,
                                     ChatContatosCotatoSelEffects,
                                     ChatEsperaCotatoSelEffects,

                                    ];
